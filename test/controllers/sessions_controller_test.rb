# frozen_string_literal: true

require "test_helper"

class SessionsControllerTest < ActionDispatch::IntegrationTest
  def setup
    @user = User.create!(
      name: "A B",
      email: "a@b.com",
      password: "welcome",
      password_confirmation: "welcome")
    @headers = headers(@user)
  end

  def test_create_user_session
    post sessions_url,  params: { login: { email: "a@b.com", password: "welcome" } }, headers: @headers
    assert_response :success
    response_json = response.parsed_body
    assert_equal response_json["authentication_token"], User.find(1).authentication_token
  end

  def test_do_not_login_unregistered_user
    post sessions_url,  params: { login: { email: "example@b.com", password: "hehe" } }, headers: @headers
    assert_response :unauthorized
    response_json = response.parsed_body
    assert_equal response_json["notice"], "Incorrect credentials, try again."
  end
end
