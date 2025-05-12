import { useState, useEffect } from "react";
import "./Forum.css"; // Estilos personalizados para el componente Forum.
import ForumTopic from "../../components/forumTopic/forumTopic.jsx";
import { FaRegCommentAlt } from "react-icons/fa";
import { AiOutlineLike, AiFillLike } from "react-icons/ai";
const Forum = () => {

    // Variables.
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [postData, setPostData] = useState([
        {
            id: 1,
            title: "¿Cómo prepararse para una entrevista técnica?",
            author: "Carlos Mendez",
            avatar: "https://randomuser.me/api/portraits/men/32.jpg",
            date: "10/05/2025",
            likes: 24,
            likedByUser: false,
            comments: 2,
            commentsList: [
                { id: 1, author: "Laura Torres", avatar: "https://randomuser.me/api/portraits/women/32.jpg", text: "Muy buenos consejos, me han ayudado mucho." },
                { id: 2, author: "Miguel Ángel", avatar: "https://randomuser.me/api/portraits/men/45.jpg", text: "¿Podrías compartir ejemplos de preguntas comunes en las entrevistas?" }
            ],
            showComments: false,
            newComment: "",
            excerpt: "Comparto mis experiencias y consejos para prepararse adecuadamente para entrevistas técnicas en el sector IT."
        },
        {
            id: 2,
            title: "Recursos para aprender React en 2025",
            author: "Ana Gómez",
            avatar: "https://randomuser.me/api/portraits/women/44.jpg",
            date: "08/05/2025",
            likes: 35,
            likedByUser: false,
            comments: 2,
            commentsList: [
                { id: 1, author: "David Parra", avatar: "https://randomuser.me/api/portraits/men/45.jpg", text: "Gracias por compartir estos recursos, justo lo que necesitaba." },
                { id: 2, author: "Sofía Méndez", avatar: "https://randomuser.me/api/portraits/women/68.jpg", text: "¿Cuál recomiendas para principiantes?" }
            ],
            showComments: false,
            newComment: "",
            excerpt: "He recopilado los mejores recursos actualizados para aprender React de manera efectiva este año."
        },
        {
            id: 3,
            title: "Hackathon virtual este fin de semana",
            author: "Martín Soto",
            avatar: "https://randomuser.me/api/portraits/men/67.jpg",
            date: "11/05/2025",
            likes: 18,
            likedByUser: false,
            comments: 1,
            commentsList: [
                { id: 1, author: "Elena Vargas", avatar: "https://randomuser.me/api/portraits/women/22.jpg", text: "¿Cuáles son los requisitos para participar?" }
            ],
            showComments: false,
            newComment: "",
            excerpt: "¡No se pierdan el hackathon virtual que organizamos este fin de semana! Grandes premios y oportunidades de networking."
        }
    ]);
    
    // Función para dar like a una publicación
    const handleLike = (postId) => {
        setPostData(postData.map(post => {
            if (post.id === postId) {
                return {
                    ...post,
                    likes: post.likedByUser ? post.likes - 1 : post.likes + 1,
                    likedByUser: !post.likedByUser
                };
            }
            return post;
        }));
    };

    // Función para mostrar/ocultar comentarios
    const toggleComments = (postId) => {
        setPostData(postData.map(post => {
            if (post.id === postId) {
                return {
                    ...post,
                    showComments: !post.showComments
                };
            }
            return post;
        }));
    };

    // Función para actualizar el texto del nuevo comentario
    const handleCommentChange = (postId, text) => {
        setPostData(postData.map(post => {
            if (post.id === postId) {
                return {
                    ...post,
                    newComment: text
                };
            }
            return post;
        }));
    };

    // Función para añadir un nuevo comentario
    const addComment = (postId) => {
        setPostData(postData.map(post => {
            if (post.id === postId && post.newComment.trim() !== "") {
                const newCommentObj = {
                    id: post.commentsList.length + 1,
                    author: "Usuario Actual", // En una app real, sería el usuario logueado
                    avatar: "https://randomuser.me/api/portraits/men/85.jpg", // Avatar del usuario actual
                    text: post.newComment
                };
                
                return {
                    ...post,
                    comments: post.comments + 1,
                    commentsList: [...post.commentsList, newCommentObj],
                    newComment: ""
                };
            }
            return post;
        }));
    };

    return(
        <div className="forum-container">
            <div className="forum-header">
                <h1>Foro de la Comunidad</h1>
                <p>Comparte conocimientos, haz preguntas y conecta con otros miembros</p>
                <button className="create-post-btn" onClick={() => setIsModalOpen(true)}>Crear nueva publicación</button>
            </div>
            
            <div className="forum-content">
                <div className="posts-container">
                    <h2>Publicaciones</h2>
                    {postData.length > 0 ? (
                        postData.map(post => (
                            <div className="post-card" key={post.id}>
                                <div className="post-header">
                                    <div className="post-author">
                                        <img src={post.avatar} alt={`Avatar de ${post.author}`} className="author-avatar" />
                                        <span>{post.author}</span>
                                    </div>
                                    <span className="post-date">{post.date}</span>
                                </div>
                                <h3 className="post-title">{post.title}</h3>
                                <p className="post-excerpt">{post.excerpt}</p>
                                <div className="post-footer">
                                    <div className="post-stats">
                                        <button className={`like-btn ${post.likedByUser ? 'liked' : ''}`} onClick={() => handleLike(post.id)}>
                                            {post.likedByUser ? <AiFillLike/> : <AiOutlineLike/>} {post.likes}
                                        </button>
                                        <button className="comment-toggle-btn" onClick={() => toggleComments(post.id)}>
                                            <FaRegCommentAlt/> {post.comments} {post.showComments ? 'Ocultar' : 'Ver'}
                                        </button>
                                    </div>
                                </div>
                                
                                {post.showComments && (
                                    <div className="comments-section">
                                        <h4>Comentarios</h4>
                                        
                                        {post.commentsList.map(comment => (
                                            <div className="comment" key={comment.id}>
                                                <div className="comment-header">
                                                    <div className="comment-author">
                                                        <img src={comment.avatar} alt={`Avatar de ${comment.author}`} className="comment-avatar" />
                                                        <span>{comment.author}</span>
                                                    </div>
                                                </div>
                                                <p className="comment-text">{comment.text}</p>
                                            </div>
                                        ))}
                                        
                                        <div className="new-comment">
                                            <textarea placeholder="Escribe un comentario..." value={post.newComment} onChange={(e) => handleCommentChange(post.id, e.target.value)} className="comment-input" />
                                            <button className="comment-btn" onClick={() => addComment(post.id)} disabled={!post.newComment.trim()}> Comentar </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))
                    ) : (
                        <p className="no-posts">No hay publicaciones disponibles</p>
                    )}
                </div>
                {isModalOpen && (
                    <ForumTopic onClose={setIsModalOpen} />
                )}
            </div>
        </div>
    );
};

export default Forum;