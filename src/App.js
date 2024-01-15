import { useEffect, useState } from 'react';
import Header from "./components/Header"
import NewFactForm from './components/NewFactForm';
import CategoryFilter from './components/CategoryFilter';
import FactList from './components/FactList';
import supabase from './supabase';

import './style.css';

const initialFacts = [
  {
    id: 1,
    text: 'React is being developed by Meta (formerly facebook)',
    source: 'https://opensource.fb.com/',
    category: 'technology',
    votesInteresting: 24,
    votesMindblowing: 9,
    votesFalse: 4,
    createdIn: 2021,
  },
  {
    id: 2,
    text: 'Millennial dads spend 3 times as much time with their kids than their fathers spent with them. In 1982, 43% of fathers had never changed a diaper. Today, that number is down to 3%',
    source:
      'https://www.mother.ly/parenting/millennial-dads-spend-more-time-with-their-kids',
    category: 'society',
    votesInteresting: 11,
    votesMindblowing: 2,
    votesFalse: 0,
    createdIn: 2019,
  },
  {
    id: 3,
    text: 'Lisbon is the capital of Portugal',
    source: 'https://en.wikipedia.org/wiki/Lisbon',
    category: 'society',
    votesInteresting: 8,
    votesMindblowing: 3,
    votesFalse: 1,
    createdIn: 2015,
  },
];

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <span style={{ fontSize: '40px' }}>{count}</span>
      <button className='btn btn-large' onClick={() => setCount((c) => c + 1)}>
        +1
      </button>
    </div>
  );
}




function Loader() {
  return <p className='message'>Loading...</p>;
}


const CATEGORIES = [
  { name: 'technology', color: '#3b82f6' },
  { name: 'science', color: '#16a34a' },
  { name: 'finance', color: '#ef4444' },
  { name: 'society', color: '#eab308' },
  { name: 'entertainment', color: '#db2777' },
  { name: 'health', color: '#14b8a6' },
  { name: 'history', color: '#f97316' },
  { name: 'news', color: '#8b5cf6' },
];

function isValidHttpUrl(string) {
  let url;
  try {
    url = new URL(string);
  } catch (_) {
    return false;
  }
  return url.protocol === 'http:' || url.protocol === 'https:';
}





function App() {
  const [showForm, setShowForm] = useState(false);
  const [facts, setFacts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentCategory, setCurrentCategory] = useState('all');

  useEffect(
    function () {
      async function getFacts() {
        setIsLoading(true);

        let query = supabase.from('facts').select('*');

        if (currentCategory !== 'all')
          query = query.eq('category', currentCategory);

        const { data: facts, error } = await query
          .order('votesInteresting', { ascending: false })
          .limit(1000);

        if (!error) setFacts(facts);
        else alert('There was a problem getting data');
        setIsLoading(false);
      }
      getFacts();
    },
    [currentCategory]
  );

  return (
    <>
      <Header showForm={showForm} setShowForm={setShowForm} />
      {showForm ? (
        <NewFactForm isValidHttpUrl={isValidHttpUrl} CATEGORIES={CATEGORIES} setFacts={setFacts} setShowForm={setShowForm} />
      ) : null}

      <main className='main'>
        <CategoryFilter setCurrentCategory={setCurrentCategory} CATEGORIES={CATEGORIES}/>

        {isLoading ? (
          <Loader />
        ) : (
          <FactList facts={facts} setFacts={setFacts} CATEGORIES={CATEGORIES} />
        )}
      </main>
    </>
  );
}





export default App;
