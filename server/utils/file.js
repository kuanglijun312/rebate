import { fileURLToPath } from 'url';
import { resolve, dirname } from 'path'
import { access, mkdir, writeFile, readFile } from 'fs/promises'

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const dataDir = resolve(__dirname, '../../data/')
export const ensureFileExisted = async (fileName, defaultContent = '[]') => {
  const filePath = resolve(dataDir, fileName)
  try {
    // 检查文件是否存在
    await access(filePath)
    // 文件存在，不需要操作
  } catch (error) {
    // 文件不存在，创建空文件
    try {
      // 确保目录存在
      const dirPath = dirname(filePath)
      await mkdir(dirPath, { recursive: true })

      // 创建空文件
      await writeFile(filePath, defaultContent, 'utf8')
      console.log(`文件已创建: ${filePath}`)
    } catch (createError) {
      console.error(`创建文件失败: ${filePath}`, createError)
      throw createError
    }
  }
  return filePath
}

export const readFileContentForJson = async (fileName, defaultContent = '[]') => {
  await ensureFileExisted(fileName, defaultContent)
  const filePath = resolve(dataDir, fileName)
  const content = await readFile(filePath, 'utf-8')
  try {
    return JSON.parse(content)
  } catch (error) {
    return null
  }
}

export const writeFileFromJsonContent = async (fileName, content) => {
  await ensureFileExisted(fileName)
  const filePath = resolve(dataDir, fileName)
  await writeFile(filePath, JSON.stringify(content, null, 2), 'utf-8')
  console.log(`文件已更新: ${filePath}`)
}