'use client';
import { useState, useEffect } from 'react';
import { createClient } from '@/utils/supabase/client'; // 确保路径和客户端配置正确

export default function Page() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const supabase = createClient();
  useEffect(() => {
    async function fetchData() {
      const { data, error } = await supabase.from('users').select('*');
      if (error) {
        setError(error.message);
      } else {
        setUsers(data);
      }
    }
    fetchData();
  }, []);

  if (error) {
    return <div>Failed to load users: {error}</div>;
  }

  if (users.length === 0) {
    return <div>No users found.</div>;
  }

  return (
    <ul>
      {users.map((user, index) => (
        <li key={index}>{user.name}</li> // 确保字段名称正确
      ))}
    </ul>
  );
}
