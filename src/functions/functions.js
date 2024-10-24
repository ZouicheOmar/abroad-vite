/** @format */

import { useEffect, useState } from 'react'
import { createClient } from '@supabase/supabase-js'
import dayjs from 'dayjs'
import { useLocation } from 'react-router-dom'
import relativeTime from 'dayjs/plugin/relativeTime'

export const getSupabase = () => {
  const supabaseUrl = 'https://bfybtqxgnnnzbcxynyvt.supabase.co'
  const supabaseKey =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJmeWJ0cXhnbm5uemJjeHlueXZ0Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY4NDc2MjQzMiwiZXhwIjoyMDAwMzM4NDMyfQ.K5gyt8afxXaeKlbyZ8DpgWJ7IvPQDbE-TLrrTSKgMLE' //! service key, not anon key
  const supabase = createClient(supabaseUrl, supabaseKey)
  return supabase
}
export const supabase = getSupabase()

export const useEvent = (id) => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [img, setImg] = useState(null)
  useEffect(() => {
    const fetch = async () => {
      const event = await supabase.from('events').select().eq('id', id)
      const imgf = await supabase.storage
        .from('media')
        .createSignedUrl(event.data[0].img_url, 60)
      setLoading(false)
      if (event.error) {
        setError(event.error)
      }
      if (imgf.error) {
        setError(img.error)
      }

      setData(event.data[0])
      setImg(imgf.data.signedUrl)
    }
    fetch()
  }, [id])

  return { data, loading, error, img }
}

export const useEvents = () => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  useEffect(() => {
    const fetch = async () => {
      const events = await supabase.from('events').select()
      if (events.error) {
        setLoading(false)
        setError(events.error)
        return
      }
      const n = events.data.length
      const w = []
      for (let i = 0; i < n; i++) {
        w.push(events.data[i])
      }
      setLoading(false)
      setData(w)
    }
    fetch()
  }, [])

  return { data, loading, error, setData }
}

export const useImage = (id) => {
  const [imgdata, setImgdata] = useState(null)
  const [imgloading, setImgloading] = useState(true)
  const [imgerror, setImgerror] = useState(null)
  useEffect(() => {
    const fetch = async () => {
      const img = await supabase.storage.from('media').createSignedUrl(id, 60)
      if (img.error) {
        console.log('error : ', img.error.message)
        setImgerror(true)
        return
      }
      setImgloading(false)
      setImgdata(img.data.signedUrl)
    }
    fetch()
  }, [])

  return { imgdata, imgloading, imgerror }
}

export const useUserFromProfiles = (id) => {
  const [user, setUser] = useState()
  useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select()
        .eq('id', id)
      if (error) {
        console.log('from useUserFromProfiles : ', error)
        return
      }
      setUser(data[0])
    }

    fetchUser()
  }, [])

  return { user }
}

//----------format-------------------//
export const format = (date) => {
  return dayjs(date).format('dddd MMMM D')
}
