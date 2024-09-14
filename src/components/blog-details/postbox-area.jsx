
import DoubleSemicolon from '@/src/svg/double-semicolon';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Categories from '../blog-list/categories';
import Tags from '../blog-list/tags';
import parse from 'html-react-parser';
import blog_details_img_1 from "../../../public/assets/img/blog/blog-details-1.jpg";
import blog_details_img_2 from "../../../public/assets/img/blog/blog-details-2.jpg";
import blog_details_img_3 from "../../../public/assets/img/blog/blog-details-3.jpg";

const PostboxArea = ({ style_details_2 }) => {
    const router = useRouter();
    const { slug } = router.query;
    const [postData, setPostData] = useState(null);

    useEffect(() => {
        if (slug) {
            fetch(`http://38.242.197.100:1337/api/news?filters[slug]=${slug}&populate=*`)
                .then(response => response.json())
                .then(data => {
                    if (data.data && data.data.length > 0) {
                        setPostData(data.data[0].attributes);
                    }
                })
                .catch(error => console.error('Error fetching post data:', error));
        }
    }, [slug]);

    if (!postData) return <div>Loading...</div>;

    return (
        <>
            <div className={`postbox__area ${style_details_2 && "pt-100"} pb-100`} style={{ paddingTop:'50px' }}>
                <div className="container">
                    <div className="row">
                        <div className="col-xxl-8 col-xl-8 col-lg-8">
                            <div className="postbox__details-wrapper pr-20">
                                <article>
                                    {style_details_2 &&
                                        <div className="postbox__thumb w-img">
                                            <Link href="/blog-details">
                                                <Image src={blog_details_img_1} alt="" />
                                            </Link>
                                        </div>
                                    }
                                    <div className="postbox__details-title-box pb-30">
                                        <h4 className="postbox__details-title">{postData.title}</h4>
                                        <div>{parse(postData.des || '')}</div>
                                      <div>{parse(postData.des_2 || '')}</div>
                                    </div>
                                    <div className="postbox__details-checkmark">
                                        <ul>
                                            {postData.checkmark_list && postData.checkmark_list.map((item, i) => <li key={i}><i className="fal fa-check"></i>{item}</li>)}
                                        </ul>
                                    </div>
                                    <div className="postbox__details-title-box pb-30">
                                        <h4 className="postbox__details-title">{postData.title_2}</h4>
                                        <p>{postData.des_3}</p>
                                    </div>
                                    <div className="postbox__details-img-box d-flex">
                                        <div className="mr-20 text-center">
                                            <Image className="mb-20" src={blog_details_img_2} alt="theme-pure" />
                                            <h4 className="postbox__details-img-caption"><span>Images by</span>@sample</h4>
                                        </div>
                                        <div className="text-center">
                                            <Image className="mb-20" src={blog_details_img_3} alt="theme-pure" />
                                            <h5 className="postbox__details-img-caption"><span>Images by</span>@sample</h5>
                                        </div>
                                    </div>
                                    <div className="postbox__details-title-box pb-15">
                                        <p>{postData.des_4}</p>
                                    </div>
                                    <div className="postbox__details-qoute mb-30">
                                        <blockquote className="d-flex align-items-start">
                                            <div className="postbox__details-qoute-icon">
                                                <DoubleSemicolon />
                                            </div>
                                            <div className="postbox__details-qoute-text">
                                                <p>{postData.quote}</p>
                                                <span>{postData.quote_author}</span>
                                            </div>
                                        </blockquote>
                                    </div>
                                    <div className="postbox__details-title-box pb-15">
                                        <p>{postData.des_5}</p>
                                    </div>
                                    <div className="postbox__details tagcloud mb-50">
                                        <span>Tags:</span>
                                        {postData.tags && postData.tags.map((tag, index) => (
                                            <Link key={index} href="#">{tag}</Link>
                                        ))}
                                    </div>

                                    {/* Navigation, author info, comments sections remain unchanged */}
                                    {/* ... */}

                                </article>
                            </div>
                        </div>
                        <div className="col-xxl-4 col-xl-4 col-lg-4">
                            <div className="sidebar__wrapper">
                                <Categories />
                                <Tags />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default PostboxArea;
