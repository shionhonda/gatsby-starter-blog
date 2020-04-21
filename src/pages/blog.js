import React from "react"
import { Link, graphql } from "gatsby"

import Image from "../components/image"
import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo.jsx"
import { rhythm } from "../utils/typography"

const BlogIndex = ({ data, location }) => {
    const siteTitle = data.site.siteMetadata.title
    const posts = data.allMarkdownRemark.edges
    const content  = (
        "A tech blog about machine learning, statistics, programming, etc. \
        I try to write all the posts in English."
    )
  
    return (
      <Layout location={location} title={siteTitle}>
        <SEO title="Tech Blog" />
        <Bio>{content}</Bio>
        <div className="posts">
        {posts.map(({ node }) => {
          const title = node.frontmatter.title || node.fields.slug
          return (
            <article key={node.fields.slug} style={{
              backgroundColor:"white", 
              height: "100%",
            }}>
              <Link style={{boxShadow: `none`, textDecoration: `none`, color: `inherit`,}} to={node.fields.slug}>
                <Image filename={node.frontmatter.featuredImage}/>
                <div style={{padding:rhythm(0.5)}}>
                  <h3 style={{marginTop: rhythm(1/4), marginBottom: rhythm(1/4),}}>
                    {title}
                  </h3>
                  <small>
                    {node.frontmatter.date}&nbsp; | &nbsp; 
                    {node.timeToRead} min read
                  </small>
                  <section>
                    <p
                      dangerouslySetInnerHTML={{
                        __html: node.frontmatter.description || node.excerpt,
                      }}
                      style={{marginBottom: 0}}
                    />
                  </section>
                </div>
              </Link>
            </article>
          )
        })}
      </div>
      </Layout>
    )
  }
  
  export default BlogIndex
  
  export const pageQuery = graphql`
    query {
      site {
        siteMetadata {
          title
        }
      }
      allMarkdownRemark(filter: {fileAbsolutePath: {regex: "/blog/"}},
      sort: { fields: [frontmatter___date], order: DESC }) {
        edges {
          node {
            excerpt
            fields {
              slug
            }
            timeToRead
            frontmatter {
              date(formatString: "MMMM DD, YYYY")
              title
              description
              featuredImage
            }
          }
        }
      }
    }`