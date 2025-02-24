import React from 'react'
import { Button } from '../ui/button'
import { ChevronDown } from 'lucide-react'


export default function Lecture() {
  return (
    <div>
        <div className="flex items-center gap-2">
        <Button variant="ghost" className="text-primary/70">
          <ChevronDown className="h-4 w-4 mr-2" />
          1-1 How The Web Works
        </Button>
      </div>

    </div>
  )
}
