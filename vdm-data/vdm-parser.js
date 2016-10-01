'use strict';

/**
 * Extract content from post
 * @param data
 * @returns {*|XMLList}
 */
module.exports.extractContent = function (data) {
    // Get content
    var content = data.find('.content .fmllink').text();

    return content;
};

/**
 * Extract Author from post
 * @param data
 * @returns {string}
 */
module.exports.extractAuthor = function (data) {
    var footer = data.find('.date p').text();
    var tmp = footer.substring(10);

    // Get author name
    var author = tmp.substring(0, tmp.indexOf('/'));

    return author;
};

/**
 * Extract Date from post
 * @param data
 * @returns {Date}
 */
module.exports.extractDate = function (data) {
    var footer = data.find('.date p').text();

    var tmp = footer.substring(footer.indexOf('/') + 2);

    // Get date (day, month, year)
    var date = tmp.substring(0, tmp.indexOf(' '));
    var day = date.split('/')[0];
    var month = date.split('/')[1];
    var year = date.split('/')[2];

    tmp = footer.substring(footer.indexOf('/') + 2);
    tmp = tmp.substring(tmp.indexOf(' à ') + 3);

    // Get hour and minute
    var hourAndMinutes = tmp.substring(0, tmp.indexOf(' '));
    var hour = hourAndMinutes.split(':')[0];
    var minute = hourAndMinutes.split(':')[1];


    return new Date(year, month - 1, day, hour, minute);
};