export async function startupAndSleep() {
  console.log("Run the following Cloud Foundry cli command to start a task...");
  console.log(`$ cf run-task task-runner "TASK" --name TASK-NAME`);
  console.log("TASK is the task you want to run");
  console.log("TASK-NAME is the name you want to give the task");
  console.log("I am waiting for cf run-task requests!");
}

export async function testTask1(
) {
  console.log(`I am a dummy task for testing`);
}

export async function testTask2(
  param1?: string,
  param2?: string,
) {
  if (!param1 || !param2) {
    // const { name, detail } = await inquirer.prompt([
    //   { name: 'name', message: 'Enter name of the task:', type: 'input' },
    //   { name: 'detail', message: 'Enter the details of the task:', type: 'input' },
    // ])
    param1 = 'foo';
    param2 = 'bar';
  }
  console.log(`I am a dummy task for testing using parm1: ${param1}, param2: ${param2}`);
}

let params: any;
const args = process.argv.slice(2);
console.log('args: ', args);

const argsList = args.map(arg => {
  const parts = arg.split('=');
  return `"${parts[0]}": "${parts[1]}"`;
});
console.log('argsList: ', argsList);

params = JSON.parse(`{${argsList.join(",")}}`);
console.log('params: ', params);

switch(params.task) {
  case "testTask1":
    testTask1();
    break;
  case "testTask2":
    testTask2(params.param1, params.param2);
    break;
  default:
    startupAndSleep();
    break;
}
