const DetailCell = ({ label, value, children }) => {
  return (
    <div className="flex items-center justify-between py-2">
        <div className="text-small text-default-500">{label}</div>
        <div className="text-small font-medium">{value || children}</div>
    </div>
  )
}

export default DetailCell