import React from "react"
import { Link, graphql } from "gatsby"

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
        {posts.map(({ node }) => {
          const title = node.frontmatter.title || node.fields.slug
          return (
            <article key={node.fields.slug}>
                <h3
                  style={{
                    marginBottom: rhythm(1 / 4),
                  }}
                >
                  <Link style={{ boxShadow: `none` }} to={node.fields.slug}>
                    {title}
                  </Link>
                </h3>
                <small>{node.frontmatter.date}</small>
              <section>
                <p
                  dangerouslySetInnerHTML={{
                    __html: node.frontmatter.description || node.excerpt,
                  }}
                />
              </section>
            </article>
          )
        })}
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
            frontmatter {
              date(formatString: "MMMM DD, YYYY")
              title
              description
            }
          }
        }
      }
    }`