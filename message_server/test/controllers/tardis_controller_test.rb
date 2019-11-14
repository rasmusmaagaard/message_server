require 'test_helper'

class TardisControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get tardis_index_url
    assert_response :success
  end

end
