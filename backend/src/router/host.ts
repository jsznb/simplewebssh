// Express 组件
import { Express } from '.';
import { delHost, saveHost, searchHost } from '../service/host';
import { searchHostLog } from '../service/log';
// Service 方法

// Host Api
Express.router.get('/api/host/search', async (req: any, res: any) => {
  try {
    let ans: any = await searchHost(req.query.path, req.query.limit, req.query.offset)
    res.send({ code: 0, data: ans.data, count: ans.count[0]['num'] })
  } catch (error: any) {
    console.log(error)
    res.send({ code: 1, error })
  }
})

Express.router.get('/api/host/del', async (req: any, res: any) => {
  try {
    await delHost(req.query.id)
    res.send({ code: 0 })
  } catch (error: any) {
    console.log(error)
    res.send({ code: 1, error })
  }
})

Express.router.get('/api/host/save', async (req: any, res: any) => {
  try {
    await saveHost(req.query.id, req.query.name, req.query.path, req.query.conf)
    res.send({ code: 0 })
  } catch (error: any) {
    console.log(error)
    res.send({ code: 1, error })
  }
})

Express.router.get('/api/host/log', async (req: any, res: any) => {
  try {
    let ans: any = await searchHostLog(req.query.path, req.query.limit, req.query.offset)
    res.send({ code: 0, data: ans.data, count: ans.count[0]['num'] })
  } catch (error: any) {
    console.log(error)
    res.send({ code: 1, error })
  }
})
