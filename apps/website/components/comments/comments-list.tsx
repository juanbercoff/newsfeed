import Comment from './comment';

const mockComments = [
  {
    id: 1,
    username: 'docperro',
    body: `Jaja, hay de todo. Mis suegros tienen cinco gatos (tres machos y dos hembras).
        Una de las gatas te busca y se deja acariciar pero es re celosa y se ofende cuando interactuás con otros gatos.
        La otra gata es cagona e irritable y, si bien a veces se te refriega, tocarla es arriesgarte a que te cague a palos
        (con sus hermosas garras). Uno de los gatos es un fantasma, aparece poco y a lo sumo se va a acostar cerca tuyo,
        pero si lo tocás (o se da cuenta que vas a hacerlo) se va. Otro de los gatos es un crack social con los humanos,
        se deja acariciar por todos lados y es lo más parecido a un peluche (nunca se enoja con un humano o lo ataca),
        pero es un bully con los demás gatos y los caga a palos si no lo controlás. El último gato es el más equilibrado y
        se deja acariciar sin drama, pero es más probable que ande por afuera vigilando la zona y solo se acerque a vos en presencia de comida.`,
    time: 'hace 1 hora',
    parentId: null,
  },
  {
    id: 2,
    username: 'perroson',
    body: `Jaja, hay de todo. Mis suegros tienen cinco gatos (tres machos y dos hembras).`,
    time: 'hace 1 hora',
    parentId: 1,
  },
  {
    id: 3,
    username: 'docperro',
    body: `Alto perfil gatológico te mandaste, ja.`,
    time: 'hace 1 hora',
    parentId: 1,
  },
  {
    id: 4,
    username: 'eterguy',
    body: `Tengo tres michis y los tres se comportan diferente, pero confirmo por uno de ellos`,
    time: 'hace 30 minutos',
    parentId: null,
  },
];

interface CommentsList {
  username: string;
  body: string;
  time: string;
  parentId: number | null;
  id: number;
}

interface CommentProps {
  username: string;
  body: string;
  time: string;
  parentId: number | null;
  commentChildren?: CommentsList[];
}

const CommentsList = () => {
  const getReplies = (commentId) => {
    return mockComments.filter((comment) => comment.parentId === commentId);
  };
  return (
    <div className="flex flex-col space-y-4">
      {mockComments
        .filter((comment) => {
          return comment.parentId === null;
        })
        .map((comment) => (
          <Comment
            key={comment.id}
            {...comment}
            commentChildren={getReplies(comment.id)}
          />
        ))}
    </div>
  );
};

export default CommentsList;
