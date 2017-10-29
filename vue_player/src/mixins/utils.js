const canlog = true

const clog = function colorLog(msg) {
  if (canlog) {
    console.log("%c "+msg,"background-image:-webkit-gradient( linear, left top,right top, color-stop(0, #00a419),color-stop(0.15, #f44336), color-stop(0.29, #ff4300),color-stop(0.3, #AA00FF),color-stop(0.4, #8BC34A), color-stop(0.45, #607D8B),color-stop(0.6, #4096EE), color-stop(0.75, #D50000),color-stop(0.9, #4096EE), color-stop(1, #FF1A00));color:transparent;-webkit-background-clip:text;font-size:13px;");
  }
}


export const IOUtil = {
  methods:{
    wirteToLocalStorage: function (key,value) {
      localStorage.setItem(key,value)
    },
    readFromLocalStorage: function(key) {
      return localStorage.getItem(key)
    }
  }
}




export { clog}
