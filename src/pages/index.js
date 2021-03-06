import React from "react"
import { Link } from "gatsby"
import Img from "gatsby-image"
import Layout from "../components/layout"
import Head from "../components/head"
import indexStyles from "./index.module.scss"
import mainStyles from "../styles/main.module.scss"
import blogStyles from "./blog.module.scss"
import Typist from "react-typist"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHeart, faPenFancy } from "@fortawesome/free-solid-svg-icons"

export const query = graphql`
    query {
        file(relativePath: { eq: "images/profile.jpg" }) {
            childImageSharp {
                fixed(width: 50) {
                    src
                }
            }
        }
        allContentfulBlogPost(
            sort: { fields: publishedAt, order: DESC }
            filter: { hideFromList: { ne: true } }
            limit: 3
        ) {
            edges {
                node {
                    title
                    hideFromList
                    slug
                    publishedAt
                    coverImage {
                        title
                        fluid {
                            sizes
                            src
                            srcSet
                        }
                    }
                }
            }
        }
    }
`

const getCoverImage = node =>
    node.coverImage ? (
        <Img className={blogStyles.coverImage} fluid={node.coverImage.fluid} />
    ) : (
        ""
    )

const getPost = node => {
    return (
        <div className={blogStyles.post}>
            <Link to={`/blog/${node.slug}`} className={blogStyles.postLink}>
                <div className={blogStyles.coverText}>
                    <span>{node.title}</span>
                </div>
                {getCoverImage(node)}
            </Link>
            <div className={blogStyles.postContent} style={{padding: 0}}>
            </div>
        </div>
    )
}
const IndexPage = props => {
    const profilePicture = (
        <Link to="/about">
            <img
                src={props.data.file.childImageSharp.fixed.src}
                alt="Marc Backes"
                className={indexStyles.profilePicture}
            />
        </Link>
    )

    return (
        <Layout>
            <Head title="Home" path={props.path} />
            <div className={mainStyles.container}>
                <h1 className={indexStyles.typing}>
                    <Typist avgTypingDelay={130} stdTypingDelay={30}>
                        <span>Hello!</span>
                        <Typist.Backspace count={6} delay={3000} />
                        <span>Ahoy!</span>
                        <Typist.Backspace count={5} delay={3000} />
                        <span>Bonjour!</span>
                        <Typist.Backspace count={8} delay={3000} />
                        <span>Moien!</span>
                        <Typist.Backspace count={6} delay={3000} />
                        <span>Hola!</span>
                        <Typist.Backspace count={5} delay={3000} />
                        <span>Hallo!</span>
                        <Typist.Backspace count={6} delay={3000} />
                        <span>Hello!</span>
                    </Typist>
                </h1>

                <h2>
                    I'm Marc {profilePicture} and
                    <br />
                    I&nbsp;
                    <FontAwesomeIcon
                        icon={faHeart}
                        className={indexStyles.heart}
                    />
                    &nbsp;web development!
                </h2>
                <p>
                    I am a freelancing <strong>full-stack developer</strong>{" "}
                    living in beautiful Luxembourg 🇱🇺, right in the heart of
                    Europe.
                </p>
                <p>
                    I mostly work with <strong>JavaScript</strong> (Node.js
                    &amp; Vue.js), but have also experience with{" "}
                    <strong>Ruby on Rails</strong>, <strong>PHP</strong>, and
                    others.
                </p>

                <p>
                    If you have any web development needs, feel free to{" "}
                    <Link to="/contact" className={mainStyles.link}>
                        contact
                    </Link>{" "}
                    or{" "}
                    <Link to="/about" className={mainStyles.link}>
                        get to know me a little better
                    </Link>
                    .
                </p>

                <h2 style={{marginTop: '3rem'}}>Latest blog posts <FontAwesomeIcon icon={faPenFancy} /></h2>

                <div className={indexStyles.posts}>
                    {props.data.allContentfulBlogPost.edges.map(({ node }) =>
                        getPost(node)
                    )}
                </div>
            </div>
        </Layout>
    )
}

export default IndexPage
