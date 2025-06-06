import { readFileContentForJson, writeFileFromJsonContent } from "../utils/file.js"
import { getRandomString } from "../utils/string.js"
import { createRelation } from "./userRelation.js"

export const getUser = async (uid) => {
    const userList = await readFileContentForJson('users.json')
    return userList.find(user => String(user.id) === String(uid))
}

export const getUserList = async (userIds) => {
    const userList = await readFileContentForJson('users.json')
    return userList.filter(user => userIds.includes(String(user.id)))
}

export const getUserListByName = async (name) => {
    const userList = await readFileContentForJson('users.json')
    return userList.filter(user => user.name.toLowerCase().includes(name.toLowerCase()))
}

export const createUser = async (name, inviteCode) => {
    const userList = await readFileContentForJson('users.json')
    const findUser = userList.find(user => user.inviteCode === inviteCode)
    const newUser = {
        id: userList.length > 0 ? userList[userList.length - 1].id + 1 : 1,
        name,
        inviteCode: getRandomString(8),
        rate: parseFloat((Math.random() / 5).toFixed(2))
    }
    userList.push(newUser)
    await writeFileFromJsonContent('users.json', userList)
    await createRelation(findUser.id, newUser.id)
    return newUser
}