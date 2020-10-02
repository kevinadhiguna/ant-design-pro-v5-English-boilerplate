import { Request, Response } from 'express';

const getNotices = (req: Request, res: Response) => {
  res.json({
    data: [
      {
        id: '000000001',
        avatar: 'https://gw.alipayobjects.com/zos/rmsportal/ThXAXghbEsBCCSDihZxY.png',
        title: 'You received 14 new weekly reports',
        datetime: '2017-08-09',
        type: 'notification',
      },
      {
        id: '000000002',
        avatar: 'https://gw.alipayobjects.com/zos/rmsportal/OKJXDXrmkNshAMvwtvhu.png',
        title: 'Your recommended Qu Nini has passed the third round of interviews',
        datetime: '2017-08-08',
        type: 'notification',
      },
      {
        id: '000000003',
        avatar: 'https://gw.alipayobjects.com/zos/rmsportal/kISTdvpyTAhtGxpovNWd.png',
        title: 'This template can distinguish multiple notification types',
        datetime: '2017-08-07',
        read: true,
        type: 'notification',
      },
      {
        id: '000000004',
        avatar: 'https://gw.alipayobjects.com/zos/rmsportal/GvqBnKhFgObvnSGkDsje.png',
        title: 'The icon on the left is used to distinguish different types.',
        datetime: '2017-08-07',
        type: 'notification',
      },
      {
        id: '000000005',
        avatar: 'https://gw.alipayobjects.com/zos/rmsportal/ThXAXghbEsBCCSDihZxY.png',
        title: 'The content should not exceed two lines，it will be automatically truncated when exceeded,',
        datetime: '2017-08-07',
        type: 'notification',
      },
      {
        id: '000000006',
        avatar: 'https://gw.alipayobjects.com/zos/rmsportal/fcHMVNCjPOsbUGdEduuv.jpeg',
        title: 'Qu Lili commented on you',
        description: 'Description Information',
        datetime: '2017-08-07',
        type: 'message',
        clickClose: true,
      },
      {
        id: '000000007',
        avatar: 'https://gw.alipayobjects.com/zos/rmsportal/fcHMVNCjPOsbUGdEduuv.jpeg',
        title: 'Zhu Fangyou replied to you',
        description: "This kind of template is used to remind who has interacted with you, put the avatar of 'who' on the left. ",
        datetime: '2017-08-07',
        type: 'message',
        clickClose: true,
      },
      {
        id: '000000008',
        avatar: 'https://gw.alipayobjects.com/zos/rmsportal/fcHMVNCjPOsbUGdEduuv.jpeg',
        title: 'Title',
        description: "This kind of template is used to remind who has interacted with you, put the avatar of 'who' on the left. ",
        datetime: '2017-08-07',
        type: 'message',
        clickClose: true,
      },
      {
        id: '000000009',
        title: 'Mission Name',
        description: 'The task needs to be started before 20:00 on 2017-01-12',
        extra: 'has not started',
        status: 'todo',
        type: 'event',
      },
      {
        id: '000000010',
        title: 'Emergency third-party code changes',
        description: 'Guanlin submitted on 2017-01-06，the code change task must be completed before 2017-01-07',
        extra: 'Expire Soon',
        status: 'urgent',
        type: 'event',
      },
      {
        id: '000000011',
        title: 'Information Security Exam',
        description: 'Assign Zhuer to complete the update and release before 2017-01-09',
        extra: '8 days elapsed',
        status: 'doing',
        type: 'event',
      },
      {
        id: '000000012',
        title: 'ABCD Version Release',
        description: 'Guanlin submitted on 2017-01-06，the code change task must be completed before 2017-01-07',
        extra: 'Processing',
        status: 'processing',
        type: 'event',
      },
    ],
  });
};

export default {
  'GET /api/notices': getNotices,
};
