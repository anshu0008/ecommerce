import imageUrlBuilder from '@sanity/image-url'



const config={
    projectId: 'bwr4gdib',
    dataset: 'production',
    apiVersion:'2023-07-20',
}


const builder = imageUrlBuilder(config)

export function urlFor(source) {
  return builder.image(source)
}

export default config;

