import React, { Fragment } from 'react'
import { graphql } from 'gatsby'
import Seo from '../components/Seo'
import ExcerptedPost from '../components/ExcerptedPost'
import Pagination from '../components/Pagination'

const ExcerptList = ({ data, ...props }) => {
  const { index, totalPages } = props.pageContext
  const posts = data.allMarkdownRemark.edges.map(edge => edge.node)

  return (
    <Fragment>
      <Seo title="Home" keywords={['Kyle Shevlin']} />

      <div>
        {posts.map(post => (
          <ExcerptedPost key={post.frontmatter.slug} post={post} />
        ))}
      </div>
      <Pagination {...{ index, totalPages }} />
    </Fragment>
  )
}

export default ExcerptList

export const query = graphql`
  query ExcerptListQuery($skip: Int!, $limit: Int!) {
    allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/posts/" } }
      sort: { fields: [frontmatter___date], order: DESC }
      skip: $skip
      limit: $limit
    ) {
      edges {
        node {
          frontmatter {
            title
            subtitle
            slug
            date(formatString: "MMMM DD, YYYY")
            categories
            tags
          }
          excerpt(pruneLength: 300, format: HTML)
        }
      }
    }
  }
`
