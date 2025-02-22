'use client'
import { Button } from "@/components/ui/button"
import Link from "next/link"



 // Error boundaries must be Client Components
 
export default function Error({
  error
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {


  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#0d1117] p-4">
    <div className="max-w-2xl mx-auto text-center space-y-4">
      <p className="text-emerald-400 text-sm font-medium">There was a problem</p>

      <h1 className="text-3xl md:text-5xl font-bold text-white mt-2 mb-4">{error.message}</h1>

      <p className="text-slate-400 text-base md:text-lg mb-8">
        Please try again later or contact support if the problem persists.
      </p>

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button className="bg-emerald-600 hover:bg-emerald-700 text-white" onClick={() => window.location.reload()}>
          Try again
        </Button>

        <Button className="bg-gray-200 px-6 hover:bg-gray-300   text-secondary" >
          <Link href="/" className="text-secondary">Go back home</Link>
        </Button>
      </div>
    </div>
  </div>
  )
}