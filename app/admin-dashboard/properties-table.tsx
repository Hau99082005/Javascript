import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getBooks } from "@/data/properties";

export default async function PropertiesTable() {
  const {data} = await getBooks();
  console.log(data)

  return (
    <>
    {!data && (
      <h1 className="text-center text-zinc-500 py-20 font-semibold text-3xl">
        Bạn không có tài nguyên nào!
      </h1>
    )} 
    {!!data && 
    <Table className="mt-5">
      <TableHeader>
        <TableRow>
          <TableHead>Tiêu Đề</TableHead>
          <TableHead>Giá tiền</TableHead>
          <TableHead>Trạng Thái</TableHead>
          <TableHead>Hành động</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((property) => {
          const address = [
            property.title,
            property.subtitle,
            property.author,
            property.isbn,
          ]
            .filter((addressLine) => !!addressLine)
            .join(", ");

          return (
            <TableRow key={property.id}>
              <TableCell>{address}</TableCell>
              <TableCell>
                {property.price}
              </TableCell>
              <TableCell>{property.status}</TableCell>
           
              <TableCell>
                <button className="text-blue-600 hover:underline">Xem</button>{" "}
                /{" "}
                <button className="text-green-600 hover:underline">Sửa</button>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
}
     </>
  );
}
