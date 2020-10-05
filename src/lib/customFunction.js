import JFormer from '../../lib/index'

JFormer.use(({ functional }) => {
  functional('N项之和', value => {
    return (+value * (+value + 1)) / 2
  })
})

// JFormer.base.feature
//   .functional('N项之和', value => {
//     return (+value * (+value + 1)) / 2
//   })
//   .withDescription('N项之和')
//   .withGroup('计算')
