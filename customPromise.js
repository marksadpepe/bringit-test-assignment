const PENDING = "pending";
const FULLFILLED = "fullfilled";
const REJECTED = "rejected";

class CustomPromise {
  constructor(executor) {
    this.state = PENDING;
    this.value = undefined;
    this.reason = undefined;

    this.onFullfilledCbks = [];
    this.onRejectedCbks = [];

    const resolve = (value) => {
      if (this.state === PENDING) {
        if (value && typeof value.then === "function") {
          value.then(resolve, reject);
          return;
        }

        this.state = FULLFILLED;
        this.value = value;

        this.onFullfilledCbks.forEach((cbk) => {
          setTimeout(() => cbk(value), 0)
        })
      }
    };

    const reject = (reason) => {
      if (this.state === PENDING) {
        this.state = REJECTED;
        this.reason = reason;
        
        this.onRejectedCbks.forEach((cbk) => {
          setTimeout(() => cbk(reason), 0)
        })
      }
    }

    try {
      executor(resolve, reject);
    } catch (err) {
      reject(err);
    }
  }

  then(onFullfilled, onRejected) {
    return new CustomPromise((resolve, reject) => {
      const handleFullfilled = (value) => {
        try {
          if (typeof onFullfilled === "function") {
            const result = onFullfilled(value);
            
            resolve(result);
          } else {
            resolve(value);
          }
        } catch (err) {
          reject(err);
        }
      };

      const handleRejected = (reason) => {
        try {
          if (typeof onRejected === "function") {
            const result = onRejected(reason);

            resolve(result);
          } else {
            reject(reason);
          }
        } catch (err) {
          reject(err);
        }
      };

      if (this.state === FULLFILLED) {
        setTimeout(() => handleFullfilled(this.value), 0);
      } else if (this.state === REJECTED) {
        setTimeout(() => handleRejected(this.reason), 0)
      } else {
        this.onFullfilledCbks.push(handleFullfilled);
        this.onRejectedCbks.push(handleRejected);
      }
    });
  }

  catch(onRejected) {
    return this.then(null, onRejected);
  }

  finally(onFinally) {
    return this.then(
      value => {
        if (typeof onFinally === "function") {
          return CustomPromise.resolve(onFinally()).then(() => value);
        }

        return value;
      },
      reason => {
        if (typeof onFinally === "function") {
          return CustomPromise.resolve(onFinally()).then(() => {
            throw reason;
          });
        }

        throw reason;
      }
    );
  }
}

const pr1 = new CustomPromise((resolve, reject) => {
  setTimeout(() => {
    resolve("PROMISE 1")
  }, 1000);
});

pr1.then(value => {
  console.log(`Result ${value}`);
  return value + " + 1-st then";
}).then(value => {
  console.log(`Result ${value}`);
}).catch(err => {
  console.error(err);
}).finally(() => {
  console.log("FINALLY");
});

const pr2 = new CustomPromise((resolve, reject) => {
  setTimeout(() => {
    reject(new Error("Error: rejected"));
  }, 1000);
});

pr2.catch(err => {
  console.log("[ERROR] ", err.message);
  return "value";
}).then(value => {
  console.log(`After error value = ${value}`);
}).finally(() => {
  console.log("Finally after error");
});
