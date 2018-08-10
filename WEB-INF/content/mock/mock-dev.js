require(['mock',
    '/mock/index.js',
    '/mock/page1.js',
    '/mock/page2.js',
    '/mock/page3.js',
    ], function (Mock) {
    Mock.setup({
        timeout: '200-600'
    });
});
