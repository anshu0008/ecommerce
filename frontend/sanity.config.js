import {defineConfig} from 'sanity';
import {deskTool} from 'sanity/desk'
import schema from './sanity/schemas';


const config=defineConfig({
    projectId: 'bwr4gdib',
    dataset: 'production',
    title:"Ecommerce",
    plugins:[deskTool()],
    basePath:'/admin',
    apiVersion:'2023-07-20',
    schema:{types:schema}
});

export default config;