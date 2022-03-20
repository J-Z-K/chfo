import inquirer from 'inquirer'
import chalk from 'chalk'

export const initInquirer = () => {
  inquirer.prompt([
    {
      type: 'list',
      name: 'option',
      message: 'What you want to do?:',
      choices: [
        { name: 'Start growing a tree', value: () => '' },
        { name: 'Modify blocked hostnames', value: hostnamesConfig }
      ]
    }
  ]).then(answers => {
    answers.option()
  })
}

const hostnamesConfig = () => {
  inquirer.prompt([
    {
      type: 'list',
      name: 'option',
      message: 'What you want to do?:',
      choices: [
        { name: 'Add blocked hostnames', value: addBlockedHostnames },
        { name: 'Show blocked hosts', value: () => '' },
        { name: 'Remove blocked hosts', value: () => '' }
      ]
    }
  ]).then(answers => {
    answers.option()
  })
}

const addBlockedHostnames = () => {
  inquirer.prompt([
    {
      type: 'input',
      name: 'hosts',
      message: 'Insert names of hosts that you want to block (space separated)'
    },
    {
      name: 'confirm',
      type: 'confirm',
      message: `does it look ok? ${chalk.blue('\nexample.com\nfacebook.com')}\n`
    }
  ]).then(answers => {
    if (!answers.confirm) addBlockedHostnames()
  })
}
