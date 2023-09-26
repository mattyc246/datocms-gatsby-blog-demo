exports.createPages = async ({ actions, graphql }) => {
  const { createPage } = actions;
  const result = await graphql(`
    {
      allDatoCmsPost(sort: { order: DESC, fields: date }) {
        edges {
          node {
            id
            slug
          }
        }
      }
    }
  `);

  result.data?.allDatoCmsPost?.edges?.forEach(({ node: page }, index) => {
    createPage({
      path: `/posts/${page?.slug}`,
      component: require.resolve('./src/templates/post-template.js'),
      context: {
        id: page?.id
      },
      defer: index > 0 ? true : false
    });
  });
};
