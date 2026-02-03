import { Item, ItemContent, ItemMedia, ItemTitle } from "@/components/ui/item";
import { Spinner } from "@/components/ui/spinner";

function LoadingState({ uploading = false }: { uploading?: boolean }) {
  return (
    <div className="flex w-full max-w-xs flex-col  gap-4 [--radius:1rem]">
      <Item variant="muted">
        <ItemMedia>
          <Spinner />
        </ItemMedia>
        <ItemContent>
          <ItemTitle className="line-clamp-1">
            {uploading ? "uploading" : "Fetching"} content...
          </ItemTitle>
        </ItemContent>
      </Item>
    </div>
  );
}
export default LoadingState;
