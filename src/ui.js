import chalk from 'chalk'
import inquirer from 'inquirer'
import { blockSites } from './hosts.js'
import { getBlockedSites, setBlockedSites, removeFromBlockedSites } from './storage.js'

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
        { name: 'Show blocked hosts', value: showBlockedHostnames },
        { name: 'Remove blocked hosts', value: removeBlockedHostnames }
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
      message: ({ hosts }) => `does it look ok? \n${chalk.blue(hosts.replace(/ /g, '\n'))}\n`
    }
  ]).then(answers => {
    if (!answers.confirm) {
      addBlockedHostnames()
    } else {
      try {
        setBlockedSites(answers.hosts)
      } catch (error) {
        console.log(error)
      }
    }
    initInquirer()
  })
}

const showBlockedHostnames = () => {
  console.log(getBlockedSites())
  initInquirer()
}

const removeBlockedHostnames = () => {
  try {
    inquirer.prompt([
      {
        type: 'checkbox',
        name: 'hosts',
        message: 'what kind of hosts do you want to delete',
        choices: getBlockedSites()
      }
    ]).then(answers => {
      try {
        console.log(answers.hosts)
        removeFromBlockedSites(answers.hosts)
        initInquirer()
      } catch (error) {
        console.log(error)
      }
    })
  } catch (error) {
    console.log(error)
  }
}
