import path from "../../aws-exports"

const axios = require('axios');
 
// Want to use async/await? Add the `async` keyword to your outer function/method.
export function getSnppts() {
  
  // try {
  //   const response = await axios.get(path.api.endpoint + 'snppts');
  //   console.log(path.api.end)
  //   console.log("Call successful")
  //   console.log(response);
  // } catch (error) {
  //   console.error(error);
  // }

  const fakeSnppts = [
    {
      id: "1",
      title: "A sample javas snppt",
      resource: "/lskdjf",
      lang: "Java",
    },
    {
      id: "2",
      title: "A sample Python snppt",
      resource: "/lskdj",
      lang: "Python",
    },
    {
      id: "3",
      title: "A sample Bash snppt",
      resource: "/lskdjf",
      lang: "Bash",
    },
    {
      id: "4",
      title: "A sample Java script snppt",
      resource: "/lskdjf",
      lang: "Java Script",
    },
  ]
  return fakeSnppts
}
