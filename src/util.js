
export function getRedirectPath({type,avatar}){
  //根据用户信息 跳转页面地址

  //user.type /boss /geek
  //user.avatar /bossinfo /geekinfo
  let url = (type==='boss')?'/boss':'/geek' ;
  if(!avatar){
    url += 'info'
  }
  console.log('ulr:  '+url);
  return url

}
