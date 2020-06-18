/**
 * 在生产环境 代理是无法生效的，所以这里没有生产环境的配置
 * The agent cannot take effect in the production environment
 * so there is no configuration of the production environment
 * For details, please see
 * https://pro.ant.design/docs/deploy
 */
export default [{
    path: '/user',
    component: '../layouts/UserLayout',
    routes: [{
      name: 'login',
      path: '/user/login',
      component: './user/login',
    }, ],
  },
  {
    path: '/',
    component: '../layouts/SecurityLayout',
    routes: [{
        path: '/',
        component: '../layouts/BasicLayout',
        routes: [{
            path: '/',
            redirect: '/welcome',
          },
          {
            path: '/welcome',
            name: 'welcome',
            icon: 'smile',
            component: './Welcome',
          },
          {
            path: '/BaseSet',
            name: 'baseSet',
            icon: 'table',
            routes: [{
                path: '/BaseSet/UserManage',
                name: 'userManage',
                component: './BaseSet/UserManage',
              },
              {
                path: '/BaseSet/RoleManage',
                name: 'roleManage',
                component: './BaseSet/RoleManage',
              },
              {
                path: '/BaseSet/ResourceManage',
                name: 'resourceManage',
                component: './BaseSet/ResourceManage',
              },
              {
                path: '/BaseSet/CompanyManage',
                name: 'companyManage',
                component: './BaseSet/CompanyManage',
              },
              {
                path: '/BaseSet/TaskManage',
                name: 'taskManage',
                component: './BaseSet/TaskManage',
              },
            ],
          },
          {
            path: '/AnalysisSale',
            name: 'AnalysisSale',
            icon: 'table',
            routes: [{
              path: '/AnalysisSale/SaleAnalysis',
              name: 'SaleAnalysis',
              component: './AnalysisSale/SaleAnalysis',
            }, {
              path: '/AnalysisSale/SaleTotal',
              name: 'SaleTotal',
              component: './AnalysisSale/SaleTotal',
            }, {
              path: '/AnalysisSale/WeavingBlock',
              name: 'WeavingBlock',
              component: './AnalysisSale/WeavingBlock',
            }, {
              path: '/AnalysisSale/GetDensity',
              name: 'GetDensity',
              component: './AnalysisSale/GetDensity',
            }, {
              path: '/AnalysisSale/OrderRatio',
              name: 'OrderRatio',
              component: './AnalysisSale/OrderRatio',
            }, {
              path: '/AnalysisSale/ChannelLevelSalesCount',
              name: 'ChannelLevelSalesCount',
              component: './AnalysisSale/ChannelLevelSalesCount',
            }, {
              path: '/AnalysisSale/HairWeftStyleSale',
              name: 'HairWeftStyleSale',
              component: './AnalysisSale/HairWeftStyleSale',
            }, {
              path: '/AnalysisSale/ProductImage',
              name: 'ProductImage',
              component: './AnalysisSale/ProductImage',
            }, ],
          },
          {
            path: '/Flow',
            name: 'Flow',
            icon: 'table',
            component: './Flow',
          },
          {
            name: 'editorflow',
            icon: 'smile',
            path: '/editorflow',
            component: './EditorFlow',
          },
          {
            component: './404',
          },
        ],
      },
      {
        component: './404',
      },
    ],
  },
  {
    component: './404',
  },
];
