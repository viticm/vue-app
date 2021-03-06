const getters = {
  sidebar: state => state.app.sidebar,
  language: state => state.app.language,
  size: state => state.app.size,
  device: state => state.app.device,
  drawer: state => state.app.drawer,
  dark: state => state.app.dark,
  app_name: state => state.app.name,
  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  email: state => state.user.email,
  introduction: state => state.user.introduction,
  role: state => state.user.role,
  routes: state => state.permission.routes,
  errorLogs: state => state.errorLog.logs
}
export default getters
