"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CardType;
(function (CardType) {
    // 团购券
    CardType["GROUPON"] = "GROUPON";
    // 折扣券
    CardType["DISCOUNT"] = "DISCOUNT";
    // 礼品券
    CardType["GIFT"] = "GIFT";
    // 代金券
    CardType["CASH"] = "CASH";
    // 通用券
    CardType["GENERAL_COUPON"] = "GENERAL_COUPON";
    // 会员卡
    CardType["MEMBER_CARD"] = "MEMBER_CARD";
    // 景点门票
    CardType["SCENIC_TICKET"] = "SCENIC_TICKET";
    // 电影票
    CardType["MOVIE_TICKET"] = "MOVIE_TICKET";
    // 飞机票
    CardType["BOARDING_PASS"] = "BOARDING_PASS";
    // 会议门票
    CardType["MEETING_TICKET"] = "MEETING_TICKET";
    // 汽车票
    CardType["BUS_TICKET"] = "BUS_TICKET";
})(CardType || (CardType = {}));
exports.default = CardType;
