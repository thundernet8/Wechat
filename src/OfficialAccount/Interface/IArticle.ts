export default interface IArticle {
    title: string;
    thumb_media_id: string;
    author: string;
    digest: string;
    show_cover_pic: 0 | 1;
    content: string;
    content_source_url: string;
    need_open_comment: 0 | 1;
    only_fans_can_comment: 0 | 1;
};
