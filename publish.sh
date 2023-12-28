
checkResult(){
  ret=$?
  if [ $ret != 0 ]
  then
    echo "[$1]执行失败"
    exit 2
    return 0
  else
    echo "[$1]执行成功"
    return 0
  fi
}

# version=$(grep -m1 '"version":' package.json | awk -F'"' '{print $4}')
# checkResult "获取当前版本号"

read -p "请输入发布备注：" message

git add -A
git commit -m "$message"
checkResult "git commit"


# 防止npm发布到别的镜像源上
npm config delete registry -g
npm config delete registry

npm version patch
checkResult "版本号升级"
git push
checkResult "git push"

git push origin --tags
checkResult "git push tags"




checkAccount(){
  for line in `npm who am i`
  do
  if [ $line != 'changxu' ]
  then
    echo "重新登录changxu"
    npm login
  fi
  done
}

checkAccount
npm publish
checkResult "npm publish"

echo "发布完毕"
