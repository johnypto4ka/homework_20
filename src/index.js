import './scss/app.scss'
import {Modal} from 'bootstrap'
import {Form} from './js/form'
import {Posts} from './js/posts'
import {Post} from './js/post'
import { marked } from 'marked'

// -----------------------------

const modalElement = document.querySelector('#formModal')
const instanceModal = new Modal(modalElement)

const formElement = document.querySelector('#form')
const instanceForm = new Form(formElement)

const postsElement = document.querySelector('#postList')
const instancePosts = new Posts(postsElement)

const postElement = document.querySelector('#post')
const instancePost = new Post(postElement)

