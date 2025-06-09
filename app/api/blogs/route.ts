import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { supabase } from '@/lib/supabase'
import { getReadingTime } from '@/lib/utils'
export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  try {
    const { title, content, excerpt, tags } = await request.json()
    
    const slug = title.toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
    const readingTime = getReadingTime(content)
    const { data, error } = await supabase
      .from('blogs')
      .insert({
        slug,
        title,
        content,
        excerpt,
        tags,
        reading_time: readingTime,
      })
      .select()
      .single()
    if (error) throw error
    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create blog' }, { status: 500 })
  }
}