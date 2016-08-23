get '/' do
  # Look in app/views/index.erb
  erb :index
end

# TODO
post '/signup' do
  @user = User.new(email: params[:email])
  if @user.save
    { error: false, msg: "Awesome, we'll be in touch shortly" }.to_json
  else
    { error: true, msg: "Email has already been used"}.to_json
  end

end