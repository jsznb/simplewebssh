// Express 组件
import { Express } from '.';
import { delCmd, saveCmd, searchCmd } from '../service/cmd';

// Command Api
Express.router.get('/api/cmd/del', async (req: any, res: any) => {
  try {
    await delCmd(req.query.id)
    res.send({ code: 0 })
  } catch (error: any) {
    console.log(error)
    res.send({ code: 1, error })
  }
})

Express.router.get('/api/cmd/save', async (req: any, res: any) => {
  try {
    await saveCmd(req.query.id, req.query.name, req.query.path, req.query.serial, req.query.rule, req.query.cmd)
    res.send({ code: 0 })
  } catch (error: any) {
    console.log(error)
    res.send({ code: 1, error })
  }
})

Express.router.get('/api/cmd/search', async (req: any, res: any) => {
  try {
    let ans: any = await searchCmd(req.query.path, req.query.limit, req.query.offset)
    res.send({ code: 0, data: ans.data, count: ans.count[0]['num'] })
  } catch (error: any) {
    console.log(error)
    res.send({ code: 1, error })
  }
})
