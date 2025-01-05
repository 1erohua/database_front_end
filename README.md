## 前端

**关于数据库的安排**

要实现的操作：

### 对于乐队成员

1. 显示、发布、修改、删除本乐队相关信息，包括乐队信息、成员信息、专辑信息、歌曲信息、演唱会信息；
2. 查看歌迷相关信息，包括乐队歌迷信息、喜欢本乐队专辑、歌曲的歌迷信息，参加本乐队演唱会的歌迷信息等；
3. 查看乐队发布专辑的乐评情况，包括分数、评论。



简单起见，分别做成表，

第一条五个表，Band、Member、Album、Song、Concert

第二条，FanLikesBands联立Fan表、FanLikesAlbum联立Fan表、FanLikesSong联立Fan表、FanAttendsConcert联立Fan表、

第三条,MusicReview表 



### 对于粉丝成员

使用乐迷用户登录，要求实现以下功能：

1. 该乐迷用户身份信息维护；
2. 显示该乐迷所喜欢的乐队、专辑、歌曲，参加的演唱会信息等，可以点开每一行查看详细信息；
3. 该乐迷可以添加、删除、修改喜欢的乐队、专辑、歌曲，参加的演唱会等；
4. 该乐迷可以查看所有未关注的乐队、专辑、歌曲、演唱会信息（可增加查询功能）
5. 该乐迷可以给任何专辑评论、评分。



2、3

```
请根据以下要求编写代码，仿照 **BandInfo.vue** 和 **Dialog.vue** 的风格与结构实现：  
两个vue文件：fan_heLikes.vue和Dialog.vue

### 功能需求：
1. 显示乐迷喜欢的乐队、专辑、歌曲，以及参加的演唱会信息。每一行信息可展开查看详细内容。
2. 
   - 添加、删除、修改喜欢的乐队、专辑、歌曲，以及参加的演唱会的信息。
   - 数据结构参照 docx 文件中提供的信息：
     - 喜欢的乐队 (FanLikesBands)
     - 喜欢的专辑 (FanLikesAlbums)
     - 喜欢的歌曲 (FanLikesSongs)
     - 参加的演唱会 (FanAttendConcerts)
3. 注意事项：
   - 在新增数据时，无需提交 `xxxID` 属性，后台会自动生成该 ID。
   - 使用 `fanId` 作为标识符，值存储在 `$store.state.fanId`。
  - 所有你需要的函数（与后端交互获取、修改和删除数据的函数）都在request.js里面存在

### 样式要求：
- 组件样式需基于 **BandInfo.vue** 和 **Dialog.vue** 的样式写法，保持一致性。
- 展开查看详细信息的样式参照 Element-UI 的样式规范。  


### 优化目标：
- 代码优先保证可维护性，性能优化不在当前任务范围内。  

请生成完整的 Vue 代码，包括模板、脚本和样式部分。
```





## 与后端的沟通

1. Login.vue里确定是否登录成功。 同时登录返回的data应该包含Role属性，Role属性的可选值应该是 Manager、BandMember、Fan