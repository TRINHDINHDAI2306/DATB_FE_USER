import io, {Socket} from 'socket.io-client'

export const socketInstance = (function () {
  let instance
  function init() {
    /* @ts-ignore */
    instance = io("http://localhost:8001")
    return instance
  }

  return {
    getInstance: function () {
      if (!instance) instance = init()
      return instance
    },
    clearInstance: function () {
      instance = null
    }
  }
})()