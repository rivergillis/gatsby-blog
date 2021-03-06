/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import Helmet from "react-helmet"
import { useStaticQuery, graphql } from "gatsby"

function SEO({ description, lang, meta, keywords, title, slug, noblog }) {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            author
            siteUrl
          }
        }
      }
    `
  )

  const metaDescription = description || site.siteMetadata.description
  let titleTemplate = `%s | ${site.siteMetadata.title}`
  if (noblog) {
    titleTemplate = `%s`
  }

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={title}
      titleTemplate={titleTemplate}
      meta={[
        {
          name: `description`,
          content: metaDescription,
        },
        {
          property: "og:url",
          content: `${site.siteMetadata.siteUrl}${slug}`,
        },
        {
          property: `og:title`,
          content: title,
        },
        {
          property: `og:description`,
          content: metaDescription,
        },
        {
          property: `og:type`,
          content: `website`,
        },
        // Add the twitter cards if we passed a slug
        ...(slug
          ? [
              {
                itemprop: "image",
                content: `${site.siteMetadata.siteUrl}${slug}twitter-card.jpg`,
              },
              { name: "twitter:card", content: "summary_large_image" },
              {
                name: "twitter:image",
                content: `${site.siteMetadata.siteUrl}${slug}twitter-card.jpg`,
              },
              {
                property: "og:url",
                content: `${site.siteMetadata.siteUrl}${slug}`,
              },
              {
                property: "og:url",
                content: `${site.siteMetadata.siteUrl}${slug}`,
              },
              {
                property: "og:image",
                content: `${site.siteMetadata.siteUrl}${slug}twitter-card.jpg`,
              },
            ]
          : [
              {
                name: `twitter:card`,
                content: `summary`,
              },
            ]),
        {
          name: `twitter:creator`,
          content: site.siteMetadata.author,
        },
        {
          name: `twitter:title`,
          content: title,
        },
        {
          name: `twitter:description`,
          content: metaDescription,
        },
      ]
        .concat(
          keywords.length > 0
            ? {
                name: `keywords`,
                content: keywords.join(`, `),
              }
            : []
        )
        .concat(meta)}
    />
  )
}

SEO.defaultProps = {
  lang: `en`,
  meta: [],
  keywords: [],
  description: ``,
}

SEO.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.arrayOf(PropTypes.object),
  keywords: PropTypes.arrayOf(PropTypes.string),
  title: PropTypes.string.isRequired,
}

export default SEO
