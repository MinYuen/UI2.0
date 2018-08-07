require(['mock',
    '/mock/index.js',
    '/mock/page1.js',
    '/mock/page2.js',
    ], function (Mock) {
    Mock.setup({
        timeout: '200-600'
    });
});
