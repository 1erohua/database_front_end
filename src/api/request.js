// 注意，向服务器申请的信息，得到的都是json格式文件！！！
// 注意，向服务器申请的信息，得到的都是json格式文件！！！
// 注意，向服务器申请的信息，得到的都是json格式文件！！！
import axios from "axios";

export function request(config) {
  const instanse = axios.create({
    baseURL: "http://10.201.46.5:8080/",
    timeout: 1000,
  });

  return instanse(config);
}

// 登录信息
export function getLogin(data){
  return request({
    url: "/login",
    method: "post", 
    data,
  });
}

// 获取用户信息
export function getInfo(data){
  return request({
    url: '/getinfo',
    method: 'post',
    data
  })
}
// 用户信息需要返回：
// role———值只能是Manager或Fan或BandMember
// username——如果是乐队则返回乐队成员的名字，如果是粉丝则返回粉丝的名字
// avatar——随便返回一张图片的网页链接，比如河海大学图标的网页连接，这个先固定返回就行
// gender——如果是管理员则返回男就行，其他的返回需要按照表中的信息返回
// age——管理员随便返回，其他需要按照表来返回
// fanId——粉丝返回他的ID即可, 其他成员返回空
// bandId——乐队成员表返回乐队Id，其他成员返回空
// MemberId——乐队成员表返回自己的成员Id，其他成员返回空

// overview 数目总览
export function overview() {
  return request({
    url: "/overview",
    method:'get'
  });
}


//***************************************************************************************************管理员*/
// 管理员操作
// 获取所有乐队信息
export function getAllBands() {
  return request({
    url: "/admin/bands",
    method:'get'
  });
}// 返回整个Band表

// 增加新的乐队
export function addBand(data) {
  return request({
    url: "/admin/bands",
    method: "post",
    data,
  });
}

// 删除乐队
export function deleteBand(bandId) {
  return request({
    url: `/admin/bands/${bandId}`,
    method: "delete",
  });
}

// 修改乐队信息
export function updateBand(bandId, data) {
  return request({
    url: `/admin/bands/${bandId}`,
    method: "put",
    data,
  });
}

// 获取所有歌迷信息
export function getAllFans() {
  return request({
    url: "/admin/fans",
    method:'get'
  });
}// 返回整个Fan表

// 增加歌迷
export function addFan(data) {
  return request({
    url: "/admin/fans",
    method: "post",
    data,
  });
}

// 删除歌迷
export function deleteFan(fanId) {
  return request({
    url: `/admin/fans/${fanId}`,
    method: "delete",
  });
}

// 修改歌迷信息
export function updateFan(fanId, data) {
  return request({
    url: `/admin/fans/${fanId}`,
    method: "put",
    data,
  });
}

// 获取所有专辑信息
export function getAllAlbums() {
  return request({
    url: "/admin/albums",
    method:'get'
  });
}// 返回整个专辑表

// 增加专辑
export function addAlbum(data) {
  return request({
    url: "/admin/albums",
    method: "post",
    data,
  });
}

// 删除专辑
export function deleteAlbum(albumId) {
  return request({
    url: `/admin/albums/${albumId}`,
    method: "delete",
  });
}

// 修改专辑信息
export function updateAlbum(albumId, data) {
  return request({
    url: `/admin/albums/${albumId}`,
    method: "put",
    data,
  });
}

// 获取所有歌曲信息
export function getAllSongs() {
  return request({
    url: "/admin/songs",
    method:'get'
  });
}// 返回整个歌曲表

// 增加歌曲
export function addSong(data) {
  return request({
    url: "/admin/songs",
    method: "post",
    data,
  });
}

// 删除歌曲
export function deleteSong(songId) {
  return request({
    url: `/admin/songs/${songId}`,
    method: "delete",
  });
}

// 修改歌曲信息
export function updateSong(songId, data) {
  return request({
    url: `/admin/songs/${songId}`,
    method: "put",
    data,
  });
}

// 获取所有演唱会信息
export function getAllConcerts() {
  return request({
    url: "/admin/concerts",
    method:'get'
  });
}

// 增加演唱会
export function addConcert(data) {
  return request({
    url: "/admin/concerts",
    method: "post",
    data,
  });
}

// 删除演唱会
export function deleteConcert(concertId) {
  return request({
    url: `/admin/concerts/${concertId}`,
    method: "delete",
  });
}

// 修改演唱会信息
export function updateConcert(concertId, data) {
  return request({
    url: `/admin/concerts/${concertId}`,
    method: "put",
    data,
  });
}


//***************************************************************************************************乐队*/
// 乐队用户操作
// 获取本乐队信息
export function getBandInfo(bandId) {
  return request({
    url: `/band/${bandId}/info`,
    method:'get'
  });
}// 返回Band表信息

// 更新本乐队信息
export function updateBandInfo(bandId, data) {
  return request({
    url: `/band/${bandId}/info`,
    method: "put",
    data,
  });
}



// 获取本乐队成员信息
export function getBandMembers(bandId) {
  return request({
    url: `/band/${bandId}/members`,
    method:'get'
  });
}// 返回BandMember信息，按相同的bandID返回


// 获取本乐队专辑信息
export function getBandAlbums(bandId) {
  return request({
    url: `/band/${bandId}/albums`,
    method:'get'
  });
}

// 发布本乐队专辑
export function createBandAlbum(bandId, data) {
  return request({
    url: `/band/${bandId}/albums`,
    method: "post",
    data,
  });
}

// 更新本乐队专辑信息
export function updateBandAlbum(bandId, albumId, data) {
  return request({
    url: `/band/${bandId}/albums/${albumId}`,
    method: "put",
    data,
  });
}

// 删除本乐队专辑
export function deleteBandAlbum(bandId, albumId) {
  return request({
    url: `/band/${bandId}/albums/${albumId}`,
    method: "delete",
  });
}

// 获取本乐队歌曲信息
export function getBandSongs(bandId) {
  return request({
    url: `/band/${bandId}/songs`,
    method:'get'
  });
}// 返回Song表信息，Song表只有AlbumID，需要将Album表与Song表结合起来查找Song表信息

// 发布本乐队歌曲
export function createBandSong(bandId, data) {
  return request({
    url: `/band/${bandId}/songs`,
    method: "post",
    data,
  });
}

// 更新本乐队歌曲信息
export function updateBandSong(bandId, songId, data) {
  return request({
    url: `/band/${bandId}/songs/${songId}`,
    method: "put",
    data,
  });
}

// 删除本乐队歌曲
export function deleteBandSong(bandId, songId) {
  return request({
    url: `/band/${bandId}/songs/${songId}`,
    method: "delete",
  });
}

// 获取本乐队演唱会信息
export function getBandConcerts(bandId) {
  return request({
    url: `/band/${bandId}/concerts`,
    method:'get'
  });
} // Concert表信息

// 发布本乐队演唱会
export function createBandConcert(bandId, data) {
  return request({
    url: `/band/${bandId}/concerts`,
    method: "post",
    data,
  });
}

// 更新本乐队演唱会信息
export function updateBandConcert(bandId, concertId, data) {
  return request({
    url: `/band/${bandId}/concerts/${concertId}`,
    method: "put",
    data,
  });
}

// 删除本乐队演唱会
export function deleteBandConcert(bandId, concertId) {
  return request({
    url: `/band/${bandId}/concerts/${concertId}`,
    method: "delete",
  });
}

// 获取本乐队歌迷信息
// FanLikesBands
export function getBandFans(bandId) {
  return request({
    url: `/band/${bandId}/FanLikesBands/fans`,
    method:'get'
  });
}// 需要返回Fan表信息，需要与FanLikesBands联立


// 获取喜欢乐队专辑表的歌迷信息
export function getAlbumFans(bandId) {
  return request({
    url: `/band/${bandId}/FanLikesAlbums/fans`,
    method:'get'
  });
}// 需要返回Fan表信息，需要与FanLikesAlbums、Album联立 


// 获取喜欢乐队歌曲表的歌迷信息
export function getSongFans(bandId) {
  return request({
    url: `/band/${bandId}/FanLikesSongs/fans`,
    method:'get'
  });
}// 需要返回Fan表信息，需要与FanLikesSongs、Album、Song表联立


// 获取参与了本乐队演唱会的粉丝信息
export function getConcertAttendees(bandId) {
  return request({
    url: `/band/${bandId}/concerts/attendees`,
    method: 'get',
  });
}// 需要返回Fan表信息，需要与FanAttendsConcert表、Concert表联立


// 获取本乐队专辑的乐评
export function getBandAlbumReviews(bandId) {
  return request({
    url: `/band/${bandId}/albums/reviews`,
    method:'get'
  });
}// 需要返回MusicReview表信息，需要Album表联立MusicReview表


//***************************************************************************************************歌迷 */

// 歌迷用户操作
// 获取当前歌迷信息
export function getFanInfo(fanId) {
  return request({
    url: `/fan/${fanId}/info`,
    method:'get'
  });
}// 返回歌迷表信息

// 更新当前歌迷信息
export function updateFanInfo(fanId, data) {
  return request({
    url: `/fan/${fanId}/info`,
    method: "put",
    data,
  });
}

// 获取当前歌迷喜欢的乐队
export function getFanLikedBands(fanId) {
  return request({
    url: `/fan/${fanId}/liked-bands`,
    method:'get'
  });
}// 返回Band表，联立FanLikesBands

// 添加喜欢的乐队
export function addLikedBand(fanId, bandId) {
  return request({
    url: `/fan/${fanId}/liked-bands/${bandId}`,
    method: "post",
  });
}

// 删除喜欢的乐队
export function removeLikedBand(fanId, bandId) {
  return request({
    url: `/fan/${fanId}/liked-bands/${bandId}`,
    method: "delete",
  });
}

// 获取当前歌迷喜欢的专辑
export function getFanLikedAlbums(fanId) {
  return request({
    url: `/fan/${fanId}/liked-albums`,
    method:'get'
  });
}// 返回Album表，联立FanLikesAlbums

// 添加喜欢的专辑
export function addLikedAlbum(fanId, albumId) {
  return request({
    url: `/fan/${fanId}/liked-albums/${albumId}`,
    method: "post",
  });
}

// 删除喜欢的专辑
export function removeLikedAlbum(fanId, albumId) {
  return request({
    url: `/fan/${fanId}/liked-albums/${albumId}`,
    method: "delete",
  });
}

// 获取当前歌迷喜欢的歌曲
export function getFanLikedSongs(fanId) {
  return request({
    url: `/fan/${fanId}/liked-songs`,
    method:'get'
  });
}// 返回Song表，联立FanLikesSongs表

// 添加喜欢的歌曲
export function addLikedSong(fanId, songId) {
  return request({
    url: `/fan/${fanId}/liked-songs/${songId}`,
    method: "post",
  });
}

// 删除喜欢的歌曲
export function removeLikedSong(fanId, songId) {
  return request({
    url: `/fan/${fanId}/liked-songs/${songId}`,
    method: "delete",
  });
}

// 获取当前歌迷参加的演唱会
export function getFanAttendedConcerts(fanId) {
  return request({
    url: `/fan/${fanId}/attended-concerts`,
    method:'get'
  });
}// 返回Concert表，联立FanAttendsConcert表

// 添加参加的演唱会
export function addAttendedConcert(fanId, concertId) {
  return request({
    url: `/fan/${fanId}/attended-concerts/${concertId}`,
    method: "post",
  });
}

// 删除参加的演唱会
export function removeAttendedConcert(fanId, concertId) {
  return request({
    url: `/fan/${fanId}/attended-concerts/${concertId}`,
    method: "delete",
  });
}

// 获取所有未关注的乐队
export function getUnfollowedBands(fanId) {
  return request({
    url: `/fan/${fanId}/unfollowed-bands`,
    method:'get'
  });
}// 返回Band表，认为未关注等同于没有Like的，即不在FanLikesBands里面出现的Band，都认为是未关注

// 获取所有未关注的专辑
export function getUnfollowedAlbums(fanId) {
  return request({
    url: `/fan/${fanId}/unfollowed-albums`,
    method:'get'
  });
}// 返回Album表，认为未关注等同于没有Like的，即不在FanLikesAlbums里面出现的Albums，都认为是未关注

// 获取所有未关注的歌曲
export function getUnfollowedSongs(fanId) {
  return request({
    url: `/fan/${fanId}/unfollowed-songs`,
    method:'get'
  });
}// 返回Song表，认为未关注等同于没有Like的，即不在FanLikesSongs里面出现的Songs，都认为是未关注

// 获取所有未参加的演唱会
export function getUnattendedConcerts(fanId) {
  return request({
    url: `/fan/${fanId}/unattended-concerts`,
    method:'get'
  });
}// 返回Concert表，认为未参加等同于没有Attend的，即不在FanAttendConcert里面出现的Concert，都认为是未参加

// 给专辑评论评分
export function addAlbumReview(fanId, albumId, data) {
  return request({
    url: `/fan/${fanId}/albums/${albumId}/reviews`,
    method: "post",
    data,
  });
}


// 注意，向服务器申请的信息，得到的都是json格式文件！！！
// 注意，向服务器申请的信息，得到的都是json格式文件！！！
// 注意，向服务器申请的信息，得到的都是json格式文件！！！

///遗失新增的函数
export function addBandMember(bandId, data) {
  return request({
    url: `/band/${bandId}/members`,
    method: "post",
    data,
  });
}

// 删除乐队成员
export function deleteBandMember(bandId, memberId) {
  return request({
    url: `/band/${bandId}/members/${memberId}`,
    method: "delete",
  });
}

// 更新乐队成员信息
export function updateBandMember(bandId, memberId, data) {
  return request({
    url: `/band/${bandId}/members/${memberId}`,
    method: "put",
    data,
  });
}
// 删除喜欢的专辑
export function deleteLikedAlbum(fanId, albumId) {
  return request({
    url: `/fan/${fanId}/liked-albums/${albumId}`,
    method: "delete",
  });
}

// 更新喜欢的专辑
export function updateLikedAlbum(fanId, albumId, data) {
  return request({
    url: `/fan/${fanId}/liked-albums/${albumId}`,
    method: "put",
    data,
  });
}

// 删除喜欢的歌曲
export function deleteLikedSong(fanId, songId) {
  return request({
    url: `/fan/${fanId}/liked-songs/${songId}`,
    method: "delete",
  });
}

// 更新喜欢的歌曲
export function updateLikedSong(fanId, songId, data) {
  return request({
    url: `/fan/${fanId}/liked-songs/${songId}`,
    method: "put",
    data,
  });
}

// 获取当前歌迷的评论
export function getFanReviews(fanId) {
  return request({
    url: `/fan/${fanId}/reviews`,
    method: 'get',

  });
}


// 删除专辑评论
export function deleteAlbumReview(fanId,reviewId) {
  return request({
    url: `/fan/${fanId}/reviews/${reviewId}`,
    method: "delete",
  });
}