import TableGrid from "@/components/booking/table-grid/TableGrid";

export default function Booking() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <main className="w-full max-w-[1440px] flex-col items-center justify-betweensm:items-start">
        <TableGrid></TableGrid>
      </main>
    </div>
  );
}
