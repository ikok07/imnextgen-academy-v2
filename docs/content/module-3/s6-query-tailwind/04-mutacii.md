---
module: "Модул 3: React & NextJS"
section: "React Query и Tailwind"
sectionOrder: 5
title: "Мутации: промяна на данни"
label: "react-6-04-mutations"
---

`useQuery` чете. `useMutation` пише — създава, променя, трие. Разликата е, че мутацията не тръгва сама: задейства се от действие на потребителя.

```sandbox
{"title":"Създаване и обновяване на списъка","height":740,"dependencies":{"@tanstack/react-query":"5.59.0"}}
---
import {useState} from "react";
import {QueryClient, QueryClientProvider, useQuery, useMutation, useQueryClient} from "@tanstack/react-query";

const client = new QueryClient();

async function fetchPosts() {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts?_limit=3");
  if (!response.ok) throw new Error("Статус " + response.status);
  return response.json();
}

async function createPost(title) {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({title, body: "текст", userId: 1})
  });
  if (!response.ok) throw new Error("Записът не успя");
  return response.json();
}

function Posts() {
  const [title, setTitle] = useState("");
  const queryClient = useQueryClient();

  const {data: posts, isPending} = useQuery({queryKey: ["posts"], queryFn: fetchPosts});

  const mutation = useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ["posts"]});
      setTitle("");
    }
  });

  if (isPending) return <p>Зарежда се...</p>;

  return (
    <div>
      <form
        onSubmit={event => { event.preventDefault(); if (title.trim()) mutation.mutate(title); }}
        style={{marginBottom: 12}}
      >
        <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Заглавие" style={{padding: 8}} />
        <button disabled={mutation.isPending || !title.trim()} style={{marginLeft: 6}}>
          {mutation.isPending ? "Записвам..." : "Добави"}
        </button>
      </form>

      {mutation.isError && <p style={{color: "#dc2626"}}>{mutation.error.message}</p>}
      {mutation.isSuccess && <p style={{color: "#16a34a", fontSize: 13}}>Записано.</p>}

      <ul style={{paddingLeft: 18, fontSize: 14}}>
        {posts.map(post => <li key={post.id}>{post.title}</li>)}
      </ul>

      <p style={{fontSize: 13, color: "#666"}}>
        Това API само се преструва, че записва — затова списъкът не се променя. Механизмът обаче е истинският.
      </p>
    </div>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={client}>
      <div style={{fontFamily: "system-ui", padding: 16}}><Posts /></div>
    </QueryClientProvider>
  );
}
```

## Инвалидиране: „тези данни вече не важат"

```javascript
queryClient.invalidateQueries({queryKey: ["posts"]});
```

Този ред казва на React Query: всичко под ключа `posts` е остаряло. Видимите на екрана заявки се презареждат автоматично. Ти не пипаш кеша ръчно и не рискуваш да пропуснеш място.

```callout
{"type":"tip","title":"Ключовете се съвпадат по префикс"}
---
`invalidateQueries({queryKey: ["posts"]})` засяга и `["posts", 1]`, и `["posts", {page: 2}]`. Затова ключовете се строят от общо към частно — така една инвалидация поддържа целия раздел актуален.
```

## Оптимистично обновяване

За действия, които почти винаги успяват (харесване, отмятане), изчакването на сървъра се усеща мудно. Оптимистичното обновяване показва резултата веднага и връща старото, ако заявката се провали.

```javascript
useMutation({
  mutationFn: toggleLike,
  onMutate: async postId => {
    await queryClient.cancelQueries({queryKey: ["posts"]});
    const previous = queryClient.getQueryData(["posts"]);

    queryClient.setQueryData(["posts"], old =>
      old.map(post => post.id === postId ? {...post, liked: !post.liked} : post)
    );

    return {previous};
  },
  onError: (error, postId, context) => {
    queryClient.setQueryData(["posts"], context.previous);
  },
  onSettled: () => {
    queryClient.invalidateQueries({queryKey: ["posts"]});
  }
});
```

```steps
---
`onMutate` — отменя текущите заявки, запазва старото състояние и рисува новото веднага.
---
`onError` — връща запазеното състояние.
---
`onSettled` — независимо от изхода, проверява при сървъра кое е вярно.
```

```callout
{"type":"warn","title":"Не за всичко"}
---
Оптимистично се прави само това, което е почти сигурно, че ще успее, и чието връщане назад не е болезнено. Плащане, изпращане на поръчка и триене на данни изчакват сървъра.
```

```quiz
{"id":"react-6-04-q1","question":"Какво прави `invalidateQueries`?","options":["Изтрива данните от кеша завинаги","Отбелязва ги като остарели и презарежда видимите на екрана","Спира всички заявки","Изчиства грешките"],"answer":1,"explanation":"Инвалидирането не трие — отбелязва. Заявките, които в момента се ползват от компоненти, се презареждат автоматично."}
```

```quiz
{"id":"react-6-04-q2","question":"Кога НЕ бива да ползваш оптимистично обновяване?","options":["При харесване на публикация","При отмятане на задача","При плащане на поръчка","При смяна на етикет"],"answer":2,"explanation":"Плащането може да се провали по много причини. Показването на успех преди потвърждение от сървъра подвежда потребителя."}
```

```takeaways
- `useMutation` пише; задейства се с `mutate` от обработчик на събитие.
- След успех се инвалидират засегнатите ключове, вместо да се пипа кешът ръчно.
- Ключовете се строят от общо към частно, за да работи съвпадението по префикс.
- Оптимистичното обновяване е за действия, които почти винаги успяват.
