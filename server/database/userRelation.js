import { readFileContentForJson, writeFileFromJsonContent } from "../utils/file.js"

export const getRelatedUserIds = async (uid) => {
  const userRelationList = await readFileContentForJson('userRelations.json')
  return userRelationList.filter(({ inviter_uid }) => String(inviter_uid) === String(uid)).map(({ uid }) => String(uid))
}

export const createRelation = async (inviter_uid, uid) => {
  const userRelationList = await readFileContentForJson('userRelations.json')
  userRelationList.push({
    inviter_uid,
    uid,
  })
  await writeFileFromJsonContent('userRelations.json', userRelationList)
  return userRelationList
}