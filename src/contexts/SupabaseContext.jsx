import React, { useContext, useState, useEffect } from 'react';
import { supabase } from './SupabaseClient';

const Context = React.createContext(null);

export const useSupabase = () => useContext(Context);

export const SupabaseProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [session, setSession] = useState(null);

  useEffect(() => {
    void supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      return session
        ? supabase.from('usuarios').select('*').eq('id', session.user.id)
        : Promise.reject(new Error('No session'));

    }).then(({ data }) => {
      setUser(data?.[0] ?? null);
    }).catch((err) => {
      console.error(err?.message);
    });

    const {
      data: { subscription }
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
      if (session) {
        void supabase.from('usuarios').select('*').eq('id', session?.user?.id)
          .then(({ data }) => {
            setUser(data?.[0] ?? null);
          });
      } else {
        setUser(null);
      }
    })

    return () => { subscription.unsubscribe(); }
  }, [])


  const login = async (login_email, login_password) => {
    try {
      const { data } = await supabase.auth.signInWithPassword({
        email: login_email,
        password: login_password
      });

      if (data?.user == null) {
        throw new Error('User not found');
      }

      setSession(data?.session ?? null);
      const supa_user = await supabase.from('usuarios').select('*').eq('id', data.user.id);
      setUser(supa_user?.data?.[0] ?? null);
    } catch (err) {
      console.error(err?.message);
      throw new Error(err?.message);
    }
  };
  const logout = async ()=> {
    setUser(null);
    void await supabase.auth.signOut();
  };

  const register = async (register_email, register_password, user_data) => {
    const { data, error: signInError } = await supabase.auth.signUp({
      email: register_email,
      password: register_password
    });

    if (signInError?.message === 'User already registered') {
      console.error(signInError?.message);
      throw new Error(signInError?.message);
    }
    if (data?.user == null || signInError != null) {
      throw new Error(signInError?.message ?? 'Error al registrarse');
    }

    setSession(data?.session);
    const { data: created_user, error } = await supabase
      .from('usuarios')
      .insert([{ ...user_data, id: data.user.id }])
      .select();

    if (error) {
      console.error(error.message);
      throw new Error(error.message);
    }
    setUser(created_user[0]);
  };

  const value = {
    user,
    login,
    session,
    logout,
    register
  };

  return (
    <Context.Provider value={value}>
      {children}
    </Context.Provider>
  );
};
