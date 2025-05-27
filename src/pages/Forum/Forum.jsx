import { useState, useEffect } from "react";
import "./Forum.css";
import ForumTopic from "../../components/forumTopic/forumTopic.jsx";
import axios from "axios";
import { FaRegCommentAlt, FaSearch } from "react-icons/fa";
import { AiOutlineLike, AiFillLike } from "react-icons/ai";
import { FormControl, Select, MenuItem, Avatar } from '@mui/material';
import { useUserStore } from '../../stores/Store.js';
import { BeatLoader } from 'react-spinners'; 

const Forum = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProgram, setSelectedProgram] = useState('');
  const [postData, setPostData] = useState([]);
  const [showAllLikers, setShowAllLikers] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useUserStore(); 
  const userId = user?.userId;

  const stringAvatar = (name) => {
    if (!name || name.split(' ').length < 2) return { children: 'U' };
    return {
      children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`
    };
  };

  const fetchPosts = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get("http://localhost:3000/forum");
      const formattedPosts = response.data.map(post => {
        const hasLiked = post.postLikes?.some(like => like.id_user === userId);
        return {
          ...post,
          author: post.author?.username || "Anónimo",
          avatar: post.author?.profileImage
            ? `http://localhost:3000/uploads/${post.author.profileImage}`
            : null,
          likedByUser: hasLiked,
          likes: post.postLikes?.length || 0,
          comments: post.comments?.length || 0,
          commentsList: post.comments?.map(comment => ({
            id: comment.id,
            author: comment.user?.username || "Anónimo",
            avatar: comment.user?.profileImage
              ? `http://localhost:3000/uploads/${comment.user.profileImage}`
              : null,
            text: comment.comment,
            date: comment.createdAt
          })) || [],
          newComment: "",
          showComments: false
        };
      });
      setPostData(formattedPosts);
    } catch (error) {
      console.error("Error al obtener publicaciones:", error);
    }finally{
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const programas = [ "Selecciona un programa", "Administración de empresas", "Comunicación Organizacional", "Contaduría Pública", "Derecho",
        "Mercadeo", "Negocios Internacionales", "Tecnología en gestión del talento humano", "Tecnología en gestión empresarial", "Tecnología en Gestión de Mercadeo y Ventas",
        "Tecnología en gestión de negocios internacionales","Animación", "Ingeniería Electrónica", "Ingeniería Industrial", "Ingeniería de Sistemas", "Diseño Gráfico",
        "Diseño de Modas", "Tecnología en sistemas", "Realización y producción musical", "Ingeniería en inteligencia de negocios"
  ];

  const filteredPosts = postData.filter(post => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.author.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesProgram = selectedProgram === '' || post.program === selectedProgram;
    return matchesSearch && matchesProgram;
  });

  const handleLike = async (postId) => {
    try {
      await axios.post("http://localhost:3000/forum-post-likes", {
        id_post: postId,
        id_user: userId
      });
      fetchPosts();
    } catch (error) {
      console.error("Error al dar like:", error);
    }
  };

  const toggleLikers = (postId) => {
  setShowAllLikers(prev => ({
    ...prev,
    [postId]: !prev[postId]
  }));
};
  const toggleComments = (postId) => {
    setPostData(postData.map(post => {
      if (post.id === postId) {
        return { ...post, showComments: !post.showComments };
      }
      return post;
    }));
  };

  const handleCommentChange = (postId, text) => {
    setPostData(postData.map(post => {
      if (post.id === postId) {
        return { ...post, newComment: text };
      }
      return post;
    }));
  };

  const addComment = async (postId) => {
    const commentText = postData.find(post => post.id === postId)?.newComment?.trim();
    if (!commentText) return;

    try {
      await axios.post("http://localhost:3000/forum-comments", {
        id_post: postId,
        id_user: userId,
        comment: commentText
      });
      fetchPosts();
    } catch (error) {
      console.error("Error al enviar comentario:", error);
    }
  };

  return (
    <div className="forum-container">
      <div className="forum-header">
        <h1>Foro de la Comunidad</h1>
        <p>Comparte conocimientos, haz preguntas y conecta con otros miembros</p>
        <button className="create-post-btn" onClick={() => setIsModalOpen(true)}>
          Crear nueva publicación
        </button>
      </div>

      <div className="forum-content">
        <div className="filters-container">
          <div className="search-filter">
            <div className="search-input-container">
              <FaSearch className="search-icon" />
              <input
                type="text"
                placeholder="Buscar publicaciones..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
              />
            </div>
          </div>

          <div className="program-filter">
            <FormControl fullWidth size="small">
              <Select
                value={selectedProgram}
                onChange={(e) => setSelectedProgram(e.target.value)}
                displayEmpty
                sx={{
                  minWidth: '200px',
                  height: '45px',
                  backgroundColor: '#f5f5f5',
                  borderRadius: '5px',
                  '& .MuiOutlinedInput-notchedOutline': { borderColor: '#e0e0e0' },
                  '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#184ea5' }
                }}
              >
                <MenuItem value="">Todos los programas</MenuItem>
                {programas.map(program => (
                  <MenuItem key={program} value={program}>{program}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
        </div>

        <div className="posts-container">
          <h2>Publicaciones</h2>
          {isLoading ? (
            <div className='loadingComponents'>
              Cargando Publicaciones...
              <BeatLoader color="#184ea5"/>
            </div>
          ) : (
            <div>
              {filteredPosts.length > 0 ? (
                filteredPosts.map(post => (
                  <div className="post-card" key={post.id}>
                    <div className="post-header">
                      <div className="post-author">
                        <Avatar src={post.avatar || undefined} alt={post.author}>
                          {!post.avatar && stringAvatar(post.author).children}
                        </Avatar>
                        <span>{post.author}</span>
                      </div>
                      <div style={{ gap: "10px", display: "flex" }}>
                        <span className="post-date">{post.program}</span>
                        <span className="post-date">{post.date}</span>
                      </div>
                    </div>
                    <h3 className="post-title">{post.title}</h3>
                    <p className="post-content"><strong>Contenido:</strong> {post.content}</p>
                    {Array.isArray(post.attachments) && post.attachments.length > 0 && (
                        <div className="post-attachments">
                            <h4>Archivos adjuntos:</h4>
                          <ul>
                            {post.attachments.map((fileUrl, index) => (
                              <li key={index} className="attachment-item">
                                <span className="attachment-icon">📎</span>
                                <a
                                  href={`http://localhost:3000/${fileUrl}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="attachment-link"
                                >
                                  Ver archivo {index + 1}
                                </a>
                              </li>
                            ))}
                          </ul>
                        </div>
                        )}
                    <div className="post-footer">
                      <div className="post-stats">
                        <button
                          className={`like-btn ${post.likedByUser ? 'liked' : ''}`}
                          onClick={() => handleLike(post.id)}
                        >
                          {post.likedByUser ? <AiFillLike /> : <AiOutlineLike />} {post.likes}
                        </button>

                        {Array.isArray(post.postLikes) && post.postLikes.length > 0 && post.postLikes[0].user && (
                          <div className="liked-by">
                            <strong>
                              A {post.postLikes[0].user.username}
                              {post.postLikes.length > 1 && ` y ${post.postLikes.length - 1} más`}
                            </strong> les gusta esto
                          </div>
                        )}

                        <button className="comment-toggle-btn" onClick={() => toggleComments(post.id)}>
                          <FaRegCommentAlt /> {post.comments} {post.showComments ? 'Ocultar' : 'Ver'}
                        </button>
                      </div>
                    </div>

                    {post.showComments && (
                      <div className="comments-section">
                        <h4>Comentarios</h4>
                        {post.commentsList.map(comment => (
                          <div className="comment" key={comment.id}>
                            <div className="comment-header">
                              <Avatar src={comment.avatar || undefined} alt={comment.author}>
                                {!comment.avatar && stringAvatar(comment.author).children}
                              </Avatar>
                              <div className="comment-meta">
                                <span className="comment-author">{comment.author}</span>
                                <span className="comment-date">
                                  {new Date(comment.date).toLocaleString('es-CO', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                    hour: '2-digit',
                                    minute: '2-digit'
                                  })}
                                </span>
                              </div>
                            </div>
                            <p className="comment-text">{comment.text}</p>
                          </div>
                        ))}
                        <div className="new-comment">
                          <textarea
                            placeholder="Escribe un comentario..."
                            value={post.newComment}
                            onChange={(e) => handleCommentChange(post.id, e.target.value)}
                            className="comment-input"
                          />
                          <button
                            className="comment-btn"
                            onClick={() => addComment(post.id)}
                            disabled={!post.newComment.trim()}
                          >
                            Comentar
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <p className="no-posts">No hay publicaciones que coincidan con tu búsqueda</p>
              )}
            </div>
          )}
        </div>

        {isModalOpen && (
          <ForumTopic onClose={setIsModalOpen} onCreated={fetchPosts} />
        )}
      </div>
    </div>
  );
};

export default Forum;
